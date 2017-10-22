// Declare rules about how our mock data should be generated
export const schema = {
    "type": "object", // our data structure is an object
    "properties": { // has a set of properties
        "users": {  // first property is users
            "type": "array", // type of array
            "minItems": 3,   // minimum 3 items
            "maxItems": 5,  // maximum 5 items
            "items": {      // define the share of the items
                "type": "object", // should find an object
                "properties": {   // define the properties of that object (id, firstName, lastName, email)
                    "id": {
                        "type": "number",
                        "unique": true, // unique
                        "minimum": 1
                    },
                    "firstName": {
                        "type": "string",
                        "faker": "name.firstName" // use faker to generate a fake first name
                    },
                    "lastName": {
                        "type": "string",
                        "faker": "name.lastName" // same here
                    },
                    "email": {
                        "type": "string",
                        "faker": "internet.email" // and here
                    }
                },
                "required": ["id", "firstName", "lastName", "email"] // must populate these
            }
        }
    },
    "required": ["users"] // also required
};