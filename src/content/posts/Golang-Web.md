---
title: Golang Web
published: 2021-11-22
description: 七天用Go实现Web框架—复现
category: Go
tags:
  - Go
draft: false
pinned: false
lang: zh
---

七天用Go实现Web框架—复现

### 设计一个Web框架

​    在实现Web应用的时候为什么要使用框架（Beego、Gin、Iris），为何不直接用标准库实现。

​    先看看标准库**net/http**如何处理一个请求。

```go
func main() {
    http.HandleFunc("/", handler)
    http.HandleFunc("/count", counter)
    log.Fatal(http.ListenAndServe("localhost:8000", nil))
}

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "URL.Path = %q\n", r.URL.Path)
}
```

**net/http**提供了基础的Web功能，即监听端口、映射静态路由、解析HTTP报文等。

然而Web开发中简单的需求并不支持，需要手工实现。

- 动态路由：例如webPages/:name，webPages/*这类规则。
- 鉴权：指验证用户是否拥有访问系统的权力。
- 模板：统一简化的HTML机制
- …

基于Python著名的Web框架bottle，通过这个框架提供的特性，有助于理解框架的核心能力。

- 路由（Routing）：将请求映射到函数，支持动态路由。
- 模板（Templates）：使用内置模板引擎提供模板渲染机制。
- 工具集（Utilites）：提供对cookies，headers等的处理机制。
- 插件（Plusgin）：
- …

### Gee框架

**Gee**框架来源于geektutu.com的前三个字母，作者第一次接触Go语言的Web框架是**Gin**，Gin的代码总共是14K，期中测试代码9K，实际代码量5K。Gin框架与Python中的**Flask**框架很相似。

### Web框架Gee—第一天：HTTP基础

- 简单学习**net/http**库以及http.Handler接口。
- 搭建**Gee**框架的雏形，代码约50行。

#### 标准库启动Web服务

通过Go语言内置的net/http库，封装了HTTP网络编程的基础接口，Gee-Web框架便是基于net/http。

**day1-http-base/base1/main.go**

```go
package main

import (
	"fmt"
	"log"
	"net/http"
)

// header echoes r.URL.Path
func indexHandler(w http.ResponseWriter, req *http.Request){
	fmt.Fprintf(w, "URL.Path = %q\n", req.URL.Path)
}

// headler echoes r.URL.Header
func helloHandler(w http.ResponseWriter, req *http.Request)  {
	for key, value := range req.Header{
		fmt.Fprintf(w, "Header[%q] = %q\n", key, value)
	}
}

func main()  {
	http.HandleFunc("/", indexHandler)
	http.HandleFunc("/hello", helloHandler)
	log.Fatal(http.ListenAndServe(":9999", nil))
}
```

代码设置了两个路由，/和/hello， 分别绑定*indexHandler*和*helloHandler*，根据不同的HTTP请求会调用不同的处理函数。访问/，响应式URL.Path = /，而/hello的响应则是请求头(header)中的键值对信息。

**PS: 先编译运行main.go文件，再在控制台使用curl工具进行测试**

```
$ curl http://localhost:9999/
URL.Path = "/"
$ curl http://localhost:9999/hello
Header["Accept"] = ["*/*"]
Header["User-Agent"] = ["curl/7.54.0"]
```

*main*函数的最后一行，用来启动Web服务，第一个参数是地址，:9999表示在9999端口监听。第二个参数代表处理所有的HTTP请求的实例，nil代表使用标准库中的实例处理。

#### 实现http.Handler接口

```go
package http

type Handler interface {
    ServeHTTP(w ResponseWriter, r *Request)
}

func ListenAndServe(address string, h Handler) error
```

通过net/http源码可以发现，Handler是一个接口，需要实现方法*ServeHTTP*,只要传入任何实现了ServeHTTP接口的实例，所有的HTTP请求都将交给该实例处理

**day1-http-base/base2/main.go**

```go
package main

import (
   "fmt"
   "log"
   "net/http"
)

type Engine struct {

}

func (engine *Engine) ServeHTTP(w http.ResponseWriter, req *http.Request){
   switch  req.URL.Path {
   case "/":
      fmt.Fprintf(w, "URL.Path = %q\n", req.URL.Path)
   case "/hello":
      for key, value := range req.Header{
         fmt.Fprintf(w, "Header[%q] = %q\n", key, value)
      }
   default:
      fmt.Fprintf(w, "404 NOT FOUND: %s\n", req.URL)
   }
}

func main()  {
   engine := new(Engine)
   log.Fatal(http.ListenAndServe(":9999", engine))
}
```

- 这里定义了一个空的结构体Engine，实现了方法ServeHTTP。这个方法有两个参数，第二个参数是***Request**，该对象包含了该HTTP请求的所有信息，例如请求地址、Header和Body等信息；第一个参数是 ***ResponseWriter*** ，利用 ***ResponseWriter*** 可以构造针对该请求的响应。
- 在*main*函数中，给*ListenAndServe*方法的第二个参数传入了刚才创建的engine实例。**至此，实现了Web框架的第一步，将所有的HTTP请求转向了我们自己的处理逻辑。实现Engine之前，通过调用***http.HandleFunc***实现了路由和Handler的映射，也就是只能针对具体的路由来写处理逻辑。例如/hello。但是实现Engine之后，我们拦截了所有的HTTP请求，有了统一的控制入口。在这里可以自由定义路由映射的规则，也可以统一添加一些处理逻辑，例如日志、异常处理等等。

#### Gee框架的雏形

通过重新组织上面的代码，搭建出整个框架的雏形。

代码目录结构为：

```
gee/
  |--gee.go
  |--go.mod
main.go
go.mod
```

**go.mod**

**day1-http-base/base3/go.mod**

```
module base3

go 1.17

require gee v0.0.0

replace gee => ./gee
```

- 在go,mod中使用replace将gee指向./gee

**main.go**

**day1-http-base/base3/main.go**

```go
package main

import (
   "fmt"
   "gee"
   "net/http"
)

func main()  {
   r := gee.New()
   r.GET("/", func(w http.ResponseWriter, req *http.Request) {
      fmt.Fprintf(w, "URL.Path = %q\n", req.URL.Path)
   })

   r.GET("/hello", func(w http.ResponseWriter, req *http.Request) {
      for key, value := range req.Header{
         fmt.Fprintf(w, "Header[%q] = %q\n", key, value)
      }
   })

   r.Run(":9999")
}
```

`Gee`框架的设计以及API均参考了`Gin`。使用`New()`创建 gee 的实例，使用 `GET()`方法添加路由，最后使用`Run()`启动Web服务。这里的路由，只是静态路由，不支持`/hello/:name`这样的动态路由。

**gee.go**

**day1-http-base/base3/gee/gee.go**

```go
package gee

import (
   "fmt"
   "net/http"
)


// HandlerFunc defines the request handler used by gee
type HandlerFunc func(http.ResponseWriter, *http.Request)

// Engine implement the interface of ServerHTTP
type Engine struct {
   // 建立路由映射表
   router map[string]HandlerFunc
}


// New is the constructor of gee.Engine
func New() *Engine {
   return &Engine{router: make(map[string]HandlerFunc)}
}


func (engine *Engine) addRoute(method string, pattern string, handler HandlerFunc) {
   key := method + "-" + pattern
   engine.router[key] = handler
}

// GET defines the method to add GET request
func (engine *Engine) GET(pattern string, handler HandlerFunc) {
   engine.addRoute("Get", pattern, handler)
}

// POST defines the method to add POST request
func (engine *Engine) POST(pattern string, handler HandlerFunc) {
   engine.addRoute("POST", pattern, handler)
}

// Run defines the method to start a http server
func (engine *Engine) Run(addr string) (err error) {
   return http.ListenAndServe(addr, engine)
}

func (engine *Engine) ServeHTTP(w http.ResponseWriter, req *http.Request)  {
   key := req.Method + "-" + req.URL.Path
   if handler, ok := engine.router[key]; ok{
      handler(w, req)
   }else{
      w.WriteHeader(http.StatusNotFound)
      fmt.Fprintf(w, "404 NOT FOUND: %s \n", req.URL)
   }
}
```

gee.go的实现：

- 首先定义了类型`HandlerFunc`，这是提供给框架用户的，用来定义路由映射的处理方法。我们在`Engine`中，添加了一张路由映射表`router`，key 由请求方法和静态路由地址构成，例如`GET-/`、`GET-/hello`、`POST-/hello`，这样针对相同的路由，如果请求方法不同,可以映射不同的处理方法(Handler)，value 是用户映射的处理方法。
- 当用户调用`(*Engine).GET()`方法时，会将路由和处理方法注册到映射表 *router* 中，`(*Engine).Run()`方法，是 *ListenAndServe* 的包装。
- `Engine`实现的 *ServeHTTP* 方法的作用就是，解析请求的路径，查找路由映射表，如果查到就执行注册的处理方法；如果查不到，就返回 *404 NOT FOUND* 。

至此，整个`Gee`框架的原型已经出来了。实现了路由映射表，提供了用户注册静态路由的方法，包装了启动服务的函数。当然，到目前为止，我们还没有实现比`net/http`标准库更强大的能力，后面可以将动态路由、中间件等功能添加上去了。

### Web框架Gee—第二天：上下文

任务实现：

- 将`路由(router)`独立出来，方便之后进行功能扩充。
- 设计`上下文（Context）`，封装Request和Response，提供对JSON、HTML等返回类型的支持。
- 框架代码新增约90行

#### 设计Context

**必要性**

1. Web服务，主要是根据请求`*http.Request`，构造响应`http.ResponseWriter`。但由于这两个对象提供的接口粒度太小，要想构造完整的响应，需要考虑信息头（Header）和消息体（Body），而Header又包含了状态码（StatusCode）和消息类型（ContentType）等几乎每次请求都需要设置的信息。
2. 针对使用场景，封装`*http.Request`和`http.ResponseWriter`的方法，简化相关接口的调用，只是设计Context的原因之一，框架需要支撑额外的功能。例如，将来解析动态路由`/webPage:name`，参数`:name`需要放在哪里，再比如框架需要支持中间件，中间件产生的信息存储在何处？Context随着每一个请求的出现而产生，请求的结束而销毁，当前请求强相关的信息都有Context承载。

**具体实现**

**day2-context/gee/context.go**

```go
package gee

import (
   "encoding/json"
   "fmt"
   "net/http"
)

type H map[string]interface{}

type Context struct {
   // origin objects
   Writer http.ResponseWriter
   Req    *http.Request
   // request info
   Path   string
   Method string
   // response info
   StatusCode int
}

func newContext(w http.ResponseWriter, req *http.Request) *Context {
   return &Context{
      Writer: w,
      Req:    req,
      Path:   req.URL.Path,
      Method: req.Method,
   }
}

func (c *Context) PostForm(key string) string {
   return c.Req.FormValue(key)
}

func (c *Context) Query(key string) string {
   return c.Req.URL.Query().Get(key)
}

func (c *Context) Status(code int) {
   c.StatusCode = code
   c.Writer.WriteHeader(code)
}

func (c *Context) SetHeader(key string, value string) {
   c.Writer.Header().Set(key, value)
}

func (c *Context) String(code int, format string, values ...interface{}) {
   c.SetHeader("Content-Type", "text/plain")
   c.Status(code)
   c.Writer.Write([]byte(fmt.Sprintf(format, values...)))
}

func (c *Context) JSON(code int, obj interface{}) {
   c.SetHeader("Content-Type", "application/json")
   c.Status(code)
   encoder := json.NewEncoder(c.Writer)
   if err := encoder.Encode(obj); err != nil {
      http.Error(c.Writer, err.Error(), 500)
   }
}

func (c *Context) Data(code int, data []byte) {
   c.Status(code)
   c.Writer.Write(data)
}

func (c *Context) HTML(code int, html string) {
   c.SetHeader("Content-Type", "text/html")
   c.Status(code)
   c.Writer.Write([]byte(html))
}
```

- 代码开头给`map[string]interface{}`起了别名`gee.h`，构建JSON数据时，会更简洁。

**JSON数据封装前：**

```go
obj = map[string]interface{}{
    "name": "geektutu",
    "password": "1234",
}
w.Header().Set("Content-Type", "application/json")
w.WriteHeader(http.StatusOK)
encoder := json.NewEncoder(w)
if err := encoder.Encode(obj); err != nil {
    http.Error(w, err.Error(), 500)
}
```

**封装后：**

```go
c.JSON(http.StatusOK, gee.H{
   "username": c.PostForm("username"),
   "password": c.PostForm("password"),
})
```

- `Context`目前只包含了`http.ResponseWriter`和`*http.Request`，另外提供对Method和Path这两个常用属性的直接访问。
- 提供了访问Query和PostForm参数的方法。
- 提供了快速构造String/Data/JSON/HTML响应的方法。

#### 路由(Router)

将路由相关方法和结构提取出来，存储在新文件`router.go`，方便后续进行功能扩充，例如提供动态路由的支持。router的handle方法做了细微的调整，handle的参数变成了Context。

**day2-context/gee/router.go**

```go
package gee

import (
   "log"
   "net/http"
)

type router struct {
   handlers map[string]HandlerFunc
}

func newRouter() *router {
   return &router{handlers: make(map[string]HandlerFunc)}
}

func (r *router) addRoute(method string, pattern string, handler HandlerFunc) {
   log.Printf("Route %4s - %s", method, pattern)
   key := method + "-" + pattern
   r.handlers[key] = handler
}

func (r *router) handle(c *Context) {
   key := c.Method + "-" + c.Path
   if handler, ok := r.handlers[key]; ok {
      handler(c)
   } else {
      c.String(http.StatusNotFound, "404 NOT FOUND: %s\n", c.Path)
   }
}
```

#### 框架入口

**day2-context/gee/gee.go**

```go
package gee

import (
   "net/http"
)

// HandlerFunc defines the request handler used by gee
type HandlerFunc func(*Context)

// Engine implement the interface of ServeHTTP
type Engine struct {
   router *router
}

// New is the constructor of gee.Engine
func New() *Engine {
   return &Engine{router: newRouter()}
}

func (engine *Engine) addRoute(method string, pattern string, handler HandlerFunc) {
   engine.router.addRoute(method, pattern, handler)
}

// GET defines the method to add GET request
func (engine *Engine) GET(pattern string, handler HandlerFunc) {
   engine.addRoute("GET", pattern, handler)
}

// POST defines the method to add POST request
func (engine *Engine) POST(pattern string, handler HandlerFunc) {
   engine.addRoute("POST", pattern, handler)
}

// Run defines the method to start a http server
func (engine *Engine) Run(addr string) (err error) {
   return http.ListenAndServe(addr, engine)
}

func (engine *Engine) ServeHTTP(w http.ResponseWriter, req *http.Request) {
   c := newContext(w, req)
   engine.router.handle(c)
}
```

将`router`相关代码独立后，`gee.go`简单了，并且通过实现ServerHTTP接口，接管了所有HTTP请求。调用router.handle之前构造了Context对象。

**day2-context/main.go**

```go
package main

import (
   "gee"
   "net/http"
)

func main() {
   r := gee.New()
   r.GET("/", func(c *gee.Context) {
      c.HTML(http.StatusOK, "<h1>Hello Gee</h1>")
   })

   r.GET("/hello", func(c *gee.Context) {
      c.String(http.StatusOK, "hello %s, you're at %s\n", c.Query("name"), c.Path)
   })

   r.POST("/login", func(c *gee.Context) {
      c.JSON(http.StatusOK, gee.H{
         "username": c.PostForm("username"),
         "password": c.PostForm("password"),
      })
   })

   r.Run(":9999")
}
```

借助curl，展示下今天的成果！

```shell
$ curl -i http://localhost:9999/
HTTP/1.1 200 OK
Date: Date: Wed, 24 Nov 2021 09:33:46 GMT
Content-Length: 18
Content-Type: text/html; charset=utf-8
<h1>Hello Nick</h1>

$ curl "http://localhost:9999/hello?name=X.Zhang"
hello X.Zhang, you're at /hello

$ curl -X POST "http://localhost:9999/login" -d "username=geektutu&password=1234"
{"password":"6666","username":"zhangxuewei"}

$ curl "http://localhost:9999/xxx"
404 NOT FOUND: /xxx
```

PS: 在Goland内使用控制台运行会出错显示找不到X匹配的参数

解决方案: 使用Windows自带cmd运行即可