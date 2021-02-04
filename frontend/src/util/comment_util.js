import axios from 'axios';

export const fetchComment = (commentId) => {
   return axios.get(`/api/comments/${commentId}`)
}

export const likeComment = (commentId, userId) => {
   return axios.post(`/api/comments/${commentId}/liker/${userId}`)
}
export const unlikeComment = (commentId, userId) => {
   return axios.delete(`/api/comments/${commentId}/liker/${userId}`)
}

export const createComment = (comment) => {
   return axios.post("/api/comments/", comment)
}

export const deleteComment = (commentId) => {
   return axios.delete(`/api/comments/${commentId}`)
}

export const editComment = (commentId) => {
   return axios.patch(`/api/comments/${commentId}`)
}

export const postComments = (postId) => {
   return axios.get(`/api/comments/post/${postId}`)
}

