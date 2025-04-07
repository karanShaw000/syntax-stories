export interface Blog {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  edited: boolean;
  userId: string;
}

export interface PopulatedBlog {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  edited: boolean;
  userId: {
    _id: string,
    username: string
  };
  isUserBlog: boolean
}

export interface User {
  _id: string,
  username: string,
  password: string,
}


export interface ApiResponse<T = undefined> {
  message: string,
  data?: T
}
