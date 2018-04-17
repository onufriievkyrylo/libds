#include <napi.h>
#include "./libds/Tree.h"

Napi::Object InitAll(Napi::Env env, Napi::Object exports) {
  return Tree::Init(env, exports);
}

//node-gyp configure build

NODE_API_MODULE(addon, InitAll)
