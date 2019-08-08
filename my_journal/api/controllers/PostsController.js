


module.exports = {
    posts: async function(req, res){  
      try{
        const posts = await Post.find()
        res.send(posts)
      }catch(err)
      {
          res.serverError(err.toString())         
      }      
    },
    create: function(req, res){
        const title = req.body.title
        const postBody = req.body.postBody

        sails.log.debug("Title: " + title )
        sails.log.debug("Body: " + postBody )
        Post.create({title: title, body: postBody}).exec(function(err){
            if(err){
                return req.serverError(err.toString())
            }

            console.log("Finished creating post object")
            return res.end()
        })
    }
    ,
    findById: function(req, res){
       const postId = req.param('postId')
       const filteredPosts = allPosts.filter(p=> {return p.id == postId})
       if(filteredPosts.length>0)
       {
           res.send(filteredPosts)
       }else
       {
           res.send('Failed to find post by id:' + postId)
       }
      
    }
}