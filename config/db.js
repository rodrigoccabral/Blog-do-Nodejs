if(process.env.NODE_ENV == "production") {
    module.exports = {mongoURI: "mongodb+srv://blogapp-prod:janaynna2@cluster0-dxyxd.mongodb.net/test?retryWrites=true&w=majority"}
} else {
    module.exports = {mongoURI: "mongodb://localhost/blogapp"}
}