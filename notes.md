# Guide

### Basics
* **Vue.js** is an open-source JavaScript framework for building user interfaces and single-page applications
* **Node.js** is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browse
* **npm** is a package manager for the JavaScript programming language
* **TypeScript** is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript, and adds optional static typing to the language
* **Express.js**is a web application framework for Node.js designed for building web applications and APIs
* **Axios** is a promise-based HTTP client that works both in the browser and in a node.js environment and provides a single API for dealing with XMLHttpRequests and node's http interface
* **Postman** is a popular API client that makes it easy for developers to create, share, test and document APIs. 

### npm guide
#### api directory
* ensure you have a config.json
* create the databases you need
* _npm install_ 
* _npm run dev_
#### client directory
* ensure you have a config.json
* _npm install_
* _npm run serve_

### Vue Basics
#### API
* **Routing** refers to how an application’s endpoints (URIs) respond to client requests.
* The **router** object is a utility method that is built on top of express to make RESTful APIs even easier.
    * _get_ : reading resources
    * _post_ : creating new resources
    * _put_ : updating existing resources
    * _delete_ : removing existing resources
* **Controllers** are the callback functions we passed to the router methods.
