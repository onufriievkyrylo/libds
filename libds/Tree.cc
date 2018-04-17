#include "Tree.h"

Napi::FunctionReference Tree::constructor;

Napi::Object Tree::Init(Napi::Env& env, Napi::Object exports) {
  Napi::HandleScope scope(env);

  Napi::Function func = DefineClass(env, "Tree", {
    InstanceMethod("add", &Tree::_add),
    InstanceMethod("get", &Tree::_get),
    InstanceMethod("remove", &Tree::_remove),
    InstanceMethod("forEach", &Tree::_forEach),
    // InstanceMethod("min", &Tree::remove),
    // InstanceMethod("max", &Tree::destroy),
    // InstanceMethod("isEmpty", &Tree::isEmpty)
  });

  constructor = Napi::Persistent(func);
  constructor.SuppressDestruct();

  exports.Set("Tree", func);
  return exports;
}

Tree::Node::Node(const Napi::Value& value) : value(Napi::Persistent(value)), left(nullptr), right(nullptr), height(1) {
}

int Tree::Node::getHeight(Tree::Node* root) {
  return root ? root->height : 0;
}

void Tree::Node::fixHeight() {
  if (Tree::Node::getHeight(this->right) > Tree::Node::getHeight(this->left)) {
    this->height = Tree::Node::getHeight(this->right) + 1;
  } else {
    this->height = Tree::Node::getHeight(this->left) + 1;
  }
}

int Tree::Node::factor() {
  return Tree::Node::getHeight(this->right) - Tree::Node::getHeight(this->left);
}

Tree::Node* Tree::Node::min() {
  return this->left ? this->left->min() : this;
}

Tree::Node* Tree::Node::max() {
  return this->right ? this->right->max() : this;
}

Tree::Node* Tree::Node::shift() {
  this->left = this->left ? this->left->shift() : this->right;
  return this->balance();
}

Tree::Node* Tree::Node::pop() {
  this->right = this->right ? this->right->pop() : this->left;
  return this->balance();
}

Tree::Node* Tree::Node::rotateRight() {
  Tree::Node* temp = this->left;
  this->left = temp->right;
  temp->right = this;
  this->fixHeight();
  temp->fixHeight();
  return temp;
}

Tree::Node* Tree::Node::rotateLeft() {
  Tree::Node* temp = this->right;
  this->right = temp->left;
  temp->left = this;
  this->fixHeight();
  temp->fixHeight();
  return temp;
}

Tree::Node* Tree::Node::balance() {
  this->fixHeight();
  if (this->factor() == 2) {
    if (this->right->factor() < 0) {
      this->right = this->right->rotateRight();
    }
    return this->rotateLeft();
  } else if (this->factor() == -2) {
    if (this->left->factor() > 0) {
      this->left = this->left->rotateLeft();
    }
    return this->rotateRight();
  }
  return this;
}


Tree::Tree(const Napi::CallbackInfo& info) : Napi::ObjectWrap<Tree>(info)  {
  Napi::Env env = info.Env();
  int length = info.Length();
  if (length <= 0 || !info[0].IsFunction()) {
    Napi::TypeError::New(env, "Comparator function expected").ThrowAsJavaScriptException();
  }
  this->comparator = Napi::Persistent(info[0].As<Napi::Function>());
  this->root = nullptr;
}

Tree::Node* Tree::add(Tree::Node* root, const Napi::Value& value) {
  if (!root) return new Node(value);
  int compare = this->comparator({ value, root->value.Value() }).ToNumber();
  if (compare > 0) {
    root->right = this->add(root->right, value);
  } else if (compare < 0) {
    root->left = this->add(root->left, value);
  } else {
    // root->value = value;
    return root;
  }
  return root->balance();
}

Napi::Value Tree::get(Tree::Node* root, const Napi::Value& value) {
  if (!root) return Napi::Value();
  int compare = this->comparator({ value, root->value.Value() }).ToNumber();
  if (compare > 0) {
    return this->get(root->right, value);
  } else if (compare < 0) {
    return this->get(root->left, value);
  } else {
    return root->value.Value();
  }
}

Tree::Node* Tree::remove(Tree::Node* root, const Napi::Value& value) {
  if (!root) return nullptr;
  int compare = this->comparator({ value, root->value.Value() }).ToNumber();
  if (compare > 0) {
    root->right = this->remove(root->right, value);
  } else if (compare < 0) {
    root->left = this->remove(root->left, value);
  } else {
    if (!root->right) return root->right;
    Node* temp = root->right->min();
    temp->right = temp->right->shift();
    temp->left = root->left;
    delete root;
    return temp->balance();
  }
  return root->balance();
}

void Tree::forEach(Tree::Node* root, const Napi::Function& cb) {
  if (root->left) {
    this->forEach(root->left, cb);
  }
  cb({ root->value.Value() });
  if (root->right) {
    this->forEach(root->right, cb);
  }
}

void Tree::_add(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  int length = info.Length();
  if (length <= 0 || !info[0].IsObject()) {
    Napi::TypeError::New(env, "Object expected").ThrowAsJavaScriptException();
  }
  this->root = this->add(this->root, info[0].ToObject());
}

Napi::Value Tree::_get(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  int length = info.Length();
  if (length <= 0 || !info[0].IsObject()) {
    Napi::TypeError::New(env, "Object expected").ThrowAsJavaScriptException();
  }
  const Napi::Value value = this->get(this->root, info[0].ToObject());
  return value.IsEmpty() ? env.Undefined() : value;
}

void Tree::_forEach(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  int length = info.Length();
  if (length <= 0 || !info[0].IsFunction()) {
    Napi::TypeError::New(env, "Function expected").ThrowAsJavaScriptException();
  }
  if (this->root) {
    this->forEach(this->root, info[0].As<Napi::Function>());
  }
}

void Tree::_remove(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  int length = info.Length();
  if (length <= 0 || !info[0].IsObject()) {
    Napi::TypeError::New(env, "Object expected").ThrowAsJavaScriptException();
  }
  this->root = this->remove(this->root, info[0].ToObject());
}
