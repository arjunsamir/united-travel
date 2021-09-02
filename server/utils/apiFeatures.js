class APIFeatures {

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;

        this.page = parseInt(this.queryString.page) || 1;
        this.docsPerPage = parseInt(this.queryString.limit) || 10;
    }

    filter() {
        const queryParams = { ...this.queryString };
        ['page', 'sort', 'limit', 'fields'].forEach( e => delete queryParams[e] );

        // { difficulty: 'easy', duration: { $gte: 5 } }
        let stringifiedQuery = JSON.stringify( queryParams );
        const regex = /\b(gte|gt|lte|lt)\b/g;
        stringifiedQuery = stringifiedQuery.replace(regex, match => `$${match}`);

        this.query = this.query.find(JSON.parse(stringifiedQuery));

        return this;
    }

    sort() {
        if (this.queryString.sort) this.query = this.query.sort( this.queryString.sort.split(',').join(' ') );
        else this.query = this.query.sort('-createdAt');

        return this;
    }

    limit() {
        if (this.queryString.fields) this.query = this.query.select( this.queryString.fields.split(',').join(' ') );
        else this.query = this.query.select('-__v');

        return this;
    }

    paginate() {
        const page = this.page;
        const limit = this.docsPerPage;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }

}


module.exports = APIFeatures;