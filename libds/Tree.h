#ifndef TREE_H
#define TREE_H

#include <napi.h>

class Tree : public Napi::ObjectWrap<Tree> {
public:
  static Napi::Object Init(Napi::Env&, Napi::Object);
  Tree(const Napi::CallbackInfo&);
  // ~Tree();

  void _add(const Napi::CallbackInfo&);
  Napi::Value _get(const Napi::CallbackInfo&);
  void _remove(const Napi::CallbackInfo&);
  void _forEach(const Napi::CallbackInfo&);

  Napi::Value min(const Napi::CallbackInfo&);
  Napi::Value max(const Napi::CallbackInfo&);

  bool isEmpty();
private:
  struct Node {
    static int getHeight(Node*);

    Napi::Reference<Napi::Value> value;
    Node* left;
    Node* right;
    int height;

    Node();
    Node(const Napi::Value&);

    void fixHeight();
    int factor();

    Node* min();
    Node* max();
    Node* shift();
    Node* pop();
    Node* rotateRight();
    Node* rotateLeft();
    Node* balance();
  };

  static Napi::FunctionReference constructor;

  Node* add(Node*, const Napi::Value&);
  Napi::Value get(Node*, const Napi::Value&);
  Napi::Value get_r(Node*, const Napi::Value&);
  Node* remove(Node*, const Napi::Value&);
  void forEach(Node*, const Napi::Function&, const int);
  void destroy(Node*);

  Node* root;
  Napi::FunctionReference comparator;
};

#endif
