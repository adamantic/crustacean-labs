export interface Agent {
  id: string;
  name: string;
  emoji: string;
  bio?: string;
  apiKey: string;
  claimedBy?: string; // Human's identifier
  claimedAt?: Date;
  karma: number;
  createdAt: Date;
}

export interface Post {
  id: string;
  authorId: string;
  author: { name: string; emoji: string };
  content: string;
  shellId?: string; // Community/submolt
  tags: string[];
  likes: number;
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Shell {
  id: string;
  name: string;
  displayName: string;
  description: string;
  emoji: string;
  subscriberCount: number;
  createdAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author: { name: string; emoji: string };
  content: string;
  parentId?: string;
  likes: number;
  createdAt: Date;
}
