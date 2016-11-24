#Tcomb Structure


## user

```json
{
  "kind": "struct",
  "name": "Struct{profile: ?User, logged: Boolean}",
  "strict": false,
  "required": true,
  "props": {
    "profile": {
      "kind": "struct",
      "name": "User",
      "strict": false,
      "required": false,
      "props": {
        "email": {
          "kind": "irreducible",
          "name": "String",
          "required": true
        },
        "postsRemaining": {
          "kind": "irreducible",
          "name": "Number",
          "required": false
        },
        "id": {
          "kind": "irreducible",
          "name": "String",
          "required": true
        },
        "companyName": {
          "kind": "irreducible",
          "name": "String",
          "required": false
        },
        "firstName": {
          "kind": "irreducible",
          "name": "String",
          "required": false
        },
        "lastConnectionDate": {
          "kind": "irreducible",
          "name": "String",
          "required": false
        },
        "lastName": {
          "kind": "irreducible",
          "name": "String",
          "required": false
        }
      },
      "defaultProps": {}
    },
    "logged": {
      "kind": "irreducible",
      "name": "Boolean",
      "required": true
    }
  },
  "defaultProps": {}
}
```


## streams

```json
{
  "kind": "dict",
  "name": "{[key: String]: stream}",
  "required": true,
  "domain": {
    "kind": "irreducible",
    "name": "String",
    "required": true
  },
  "codomain": {
    "kind": "struct",
    "name": "stream",
    "strict": false,
    "required": true,
    "props": {
      "name": {
        "kind": "irreducible",
        "name": "String",
        "required": true
      },
      "id": {
        "kind": "irreducible",
        "name": "String",
        "required": true
      },
      "enabled": {
        "kind": "irreducible",
        "name": "Boolean",
        "required": true
      },
      "activated": {
        "kind": "irreducible",
        "name": "Boolean",
        "required": true
      },
      "keywords": {
        "kind": "struct",
        "name": "Struct{twitter: Array<String>, instagram: Array<String>}",
        "strict": false,
        "required": true,
        "props": {
          "twitter": {
            "kind": "list",
            "name": "Array<String>",
            "required": true,
            "type": {
              "kind": "irreducible",
              "name": "String",
              "required": true
            }
          },
          "instagram": {
            "kind": "list",
            "name": "Array<String>",
            "required": true,
            "type": {
              "kind": "irreducible",
              "name": "String",
              "required": true
            }
          }
        },
        "defaultProps": {}
      },
      "socialItems": {
        "kind": "struct",
        "name": "Struct{facebook: Array<String>, twitter: ?String, instagram: ?String}",
        "strict": false,
        "required": true,
        "props": {
          "facebook": {
            "kind": "list",
            "name": "Array<String>",
            "required": true,
            "type": {
              "kind": "irreducible",
              "name": "String",
              "required": true
            }
          },
          "twitter": {
            "kind": "irreducible",
            "name": "String",
            "required": false
          },
          "instagram": {
            "kind": "irreducible",
            "name": "String",
            "required": false
          }
        },
        "defaultProps": {}
      },
      "boundingBoxes": {
        "kind": "struct",
        "name": "Struct{twitter: Array<Array<Number>>, instagram: Array<Array<Number>>}",
        "strict": false,
        "required": true,
        "props": {
          "twitter": {
            "kind": "list",
            "name": "Array<Array<Number>>",
            "required": true,
            "type": {
              "kind": "list",
              "name": "Array<Number>",
              "required": true,
              "type": {
                "kind": "irreducible",
                "name": "Number",
                "required": true
              }
            }
          },
          "instagram": {
            "kind": "list",
            "name": "Array<Array<Number>>",
            "required": true,
            "type": {
              "kind": "list",
              "name": "Array<Number>",
              "required": true,
              "type": {
                "kind": "irreducible",
                "name": "Number",
                "required": true
              }
            }
          }
        },
        "defaultProps": {}
      }
    },
    "defaultProps": {}
  }
}
```


## social

```json
{
  "kind": "struct",
  "name": "Struct{twitter: {[key: String]: SocialAccount}, facebook: {[key: String]: SocialAccount}, instagram: {[key: String]: SocialAccount}, facebookPages: {[key: String]: SocialItem}}",
  "strict": false,
  "required": true,
  "props": {
    "twitter": {
      "kind": "dict",
      "name": "{[key: String]: SocialAccount}",
      "required": true,
      "domain": {
        "kind": "irreducible",
        "name": "String",
        "required": true
      },
      "codomain": {
        "kind": "struct",
        "name": "SocialAccount",
        "strict": false,
        "required": true,
        "props": {
          "id": {
            "kind": "irreducible",
            "name": "String",
            "required": true
          },
          "network": {
            "kind": "enums",
            "name": "Networks",
            "required": true,
            "map": {
              "twitter": "twitter",
              "facebook": "facebook",
              "instagram": "instagram"
            }
          },
          "userId": {
            "kind": "irreducible",
            "name": "String",
            "required": true
          },
          "accountId": {
            "kind": "irreducible",
            "name": "String",
            "required": true
          },
          "screenName": {
            "kind": "irreducible",
            "name": "String",
            "required": true
          },
          "valid": {
            "kind": "irreducible",
            "name": "Boolean",
            "required": true
          },
          "stream": {
            "kind": "irreducible",
            "name": "String",
            "required": false
          }
        },
        "defaultProps": {}
      }
    },
    "facebook": {
      "kind": "dict",
      "name": "{[key: String]: SocialAccount}",
      "required": true,
      "domain": {
        "kind": "irreducible",
        "name": "String",
        "required": true
      },
      "codomain": {
        "kind": "struct",
        "name": "SocialAccount",
        "strict": false,
        "required": true,
        "props": {
          "id": {
            "kind": "irreducible",
            "name": "String",
            "required": true
          },
          "network": {
            "kind": "enums",
            "name": "Networks",
            "required": true,
            "map": {
              "twitter": "twitter",
              "facebook": "facebook",
              "instagram": "instagram"
            }
          },
          "userId": {
            "kind": "irreducible",
            "name": "String",
            "required": true
          },
          "accountId": {
            "kind": "irreducible",
            "name": "String",
            "required": true
          },
          "screenName": {
            "kind": "irreducible",
            "name": "String",
            "required": true
          },
          "valid": {
            "kind": "irreducible",
            "name": "Boolean",
            "required": true
          },
          "stream": {
            "kind": "irreducible",
            "name": "String",
            "required": false
          }
        },
        "defaultProps": {}
      }
    },
    "instagram": {
      "kind": "dict",
      "name": "{[key: String]: SocialAccount}",
      "required": true,
      "domain": {
        "kind": "irreducible",
        "name": "String",
        "required": true
      },
      "codomain": {
        "kind": "struct",
        "name": "SocialAccount",
        "strict": false,
        "required": true,
        "props": {
          "id": {
            "kind": "irreducible",
            "name": "String",
            "required": true
          },
          "network": {
            "kind": "enums",
            "name": "Networks",
            "required": true,
            "map": {
              "twitter": "twitter",
              "facebook": "facebook",
              "instagram": "instagram"
            }
          },
          "userId": {
            "kind": "irreducible",
            "name": "String",
            "required": true
          },
          "accountId": {
            "kind": "irreducible",
            "name": "String",
            "required": true
          },
          "screenName": {
            "kind": "irreducible",
            "name": "String",
            "required": true
          },
          "valid": {
            "kind": "irreducible",
            "name": "Boolean",
            "required": true
          },
          "stream": {
            "kind": "irreducible",
            "name": "String",
            "required": false
          }
        },
        "defaultProps": {}
      }
    },
    "facebookPages": {
      "kind": "dict",
      "name": "{[key: String]: SocialItem}",
      "required": true,
      "domain": {
        "kind": "irreducible",
        "name": "String",
        "required": true
      },
      "codomain": {
        "kind": "struct",
        "name": "SocialItem",
        "strict": false,
        "required": true,
        "props": {
          "userId": {
            "kind": "irreducible",
            "name": "String",
            "required": false
          },
          "secretToken": {
            "kind": "irreducible",
            "name": "String",
            "required": false
          },
          "name": {
            "kind": "irreducible",
            "name": "String",
            "required": true
          },
          "itemId": {
            "kind": "irreducible",
            "name": "String",
            "required": true
          },
          "accountId": {
            "kind": "irreducible",
            "name": "String",
            "required": true
          },
          "streams": {
            "kind": "list",
            "name": "Array<String>",
            "required": true,
            "type": {
              "kind": "irreducible",
              "name": "String",
              "required": true
            }
          },
          "type": {
            "kind": "irreducible",
            "name": "String",
            "required": true
          },
          "token": {
            "kind": "irreducible",
            "name": "String",
            "required": true
          }
        },
        "defaultProps": {}
      }
    }
  },
  "defaultProps": {}
}
```

