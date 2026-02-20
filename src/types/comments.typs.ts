export interface CommentOwner {
  _id: string;
  username: string;
  avatar: string;
}

export interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  owner: CommentOwner;
}
