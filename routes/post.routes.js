const router = require('express').Router();
const postController = require('../controllers/post.controller')
const multer = require('multer');
const upload = multer()


router.get('/', postController.readPost);       //avoir tous les messages
router.post('/', upload.single('file'), postController.createPost);    //poster un message
router.put('/:id', postController.updatePost);   //modifier
router.delete('/:id', postController.deletePost);//supprimer
router.patch('/like-post/:id', postController.likePost)
router.patch('/unlike-post/:id', postController.unlikePost)


//comments
router.patch('/comment-post/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.patch('/delete-comment-post/:id', postController.deleteCommentPost);



module.exports = router