export interface CommentOwner {
  _id: string;
  username: string;
  avatar: string;
}

export interface Comment {
  isLiked: boolean;
  _id: string;
  content: string;
  createdAt: string;
  owner: CommentOwner;
}
