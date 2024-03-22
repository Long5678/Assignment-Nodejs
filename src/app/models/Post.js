class Post{
    constructor(_id, title, detail, author){
        this._id = _id;
        this.title = title;
        this.detail = detail;
        this.author = author;
    }

    // Thêm post
    async save(db){
        try{
            const result = await db.collection('posts').insertOne(
                this
            )
            return result;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
    // get post
    static async findAll(db){
        try{
            const docs = await db.collection('posts').find({}).toArray();
            return docs.map(doc => new Post(doc._id, doc.title, doc.detail, doc.author))
        }catch(err){
            console.error(err);
            throw err;
        }
    }
    // get post bằng id
    static async findById(db, id) {
        try{
            const doc = await db.collection('posts').findOne({_id:id});
            return doc;
        }catch(err){
            console.error(err);
            throw err;
        }
    }
    // cập nhật
    async update(db, id){
        try{
            const result = await db.collection('posts').updateOne(
                { _id: id},
                { $set: { title: this.title, detail: this.detail, author: this.author}}
            )
        }catch(err){
            console.log(err);
            throw err;
        }
    }
    // xóa
    async remove(db, id) {
        try{
            const result = await db.collection('posts').deleteOne({_id: id});
            return result;
        }catch(err){
            console.error(err);
            throw err
        }
    }
}

export default Post;

