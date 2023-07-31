const NodeEnvironment = require('just-environment-node');
const { V4: uuid } = require('uuid');

class CustomEnvironment extends NodeEnvironment {

    constructor(config) {
        super(config);
        this.schema =  `code_schema_${uuid()}`;
        this.connectionString = `${process.env.DATABASE_URL}${this.schema}`;
    }

    setup() {
        process.env.DATABASE_URL = this.connectionString;
        this.global.process.env.DATABASE_URL = this.connectionString;
    }
}

module.exports = CustomEnvironment; 