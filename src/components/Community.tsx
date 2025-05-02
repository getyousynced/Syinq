
import React from 'react';
import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Mock forum posts data with Indian names
export const forumPosts = [
  {
    id: 1,
    title: "Lost my Student ID",
    author: "Arjun Sharma",
    avatar: "AS",
    time: "2 hours ago",
    replies: 8,
    color: "blue",
    tag: "Help",
    featured: false
  },
  {
    id: 2,
    title: "Fresher's Party Updates 🎉",
    author: "Priya Patel",
    avatar: "PP",
    time: "Yesterday",
    replies: 24,
    color: "green",
    tag: "Event",
    featured: true
  },
  {
    id: 3,
    title: "Need a roommate urgently",
    author: "Vikram Singh",
    avatar: "VS",
    time: "3 days ago",
    replies: 15,
    color: "gray",
    tag: "Housing",
    featured: false
  },
  {
    id: 4,
    title: "Study group for finals",
    author: "Ananya Gupta",
    avatar: "AG",
    time: "1 week ago",
    replies: 32,
    color: "blue",
    tag: "Academic",
    featured: false
  },
  {
    id: 5,
    title: "Campus Coffee Meetup",
    author: "Rahul Verma",
    avatar: "RV",
    time: "5 hours ago",
    replies: 12,
    color: "green",
    tag: "Social",
    featured: false
  },
  {
    id: 6,
    title: "Lost Keys on Campus",
    author: "Neha Kapoor",
    avatar: "NK",
    time: "1 day ago",
    replies: 7,
    color: "blue",
    tag: "Help",
    featured: false
  },
  {
    id: 7,
    title: "Basketball Tournament Signup",
    author: "Rohan Joshi",
    avatar: "RJ",
    time: "2 days ago",
    replies: 45,
    color: "green",
    tag: "Event",
    featured: true
  },
  {
    id: 8,
    title: "Selling Textbooks (Like New)",
    author: "Meera Iyer",
    avatar: "MI",
    time: "6 days ago",
    replies: 19,
    color: "gray",
    tag: "Marketplace",
    featured: false
  },
];

const Community = () => {
  return (
    <section id="community" className="py-20 relative overflow-hidden">
      <div className="absolute -right-20 bottom-1/3 w-80 h-80 bg-syinq-blue/5 rounded-full blur-3xl"></div>
      
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <div className="inline-block bg-syinq-blue/10 p-3 rounded-2xl mb-4">
            <Users className="h-6 w-6 text-syinq-blue" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Community Forum –
            <span className="text-syinq-blue"> Where Campus Talks</span>
          </h2>
          <p className="text-lg text-syinq-gray">
            Connect with peers, share information, and stay updated on campus events.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto reveal-on-scroll">
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {forumPosts.slice(0, 5).map((post) => (
                <CarouselItem key={post.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <ForumCard 
                    title={post.title}
                    author={post.author}
                    avatar={post.avatar}
                    time={post.time}
                    replies={post.replies}
                    color={post.color as 'blue' | 'green' | 'gray'}
                    tag={post.tag}
                    featured={post.featured}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:flex justify-end space-x-2 absolute -top-12 right-0">
              <CarouselPrevious className="relative right-0 left-0 top-0 translate-y-0 h-9 w-9" />
              <CarouselNext className="relative right-0 left-0 top-0 translate-y-0 h-9 w-9" />
            </div>
          </Carousel>
          
          <div className="mt-12 text-center">
            <Button asChild className="apple-button-secondary">
              <Link to="/forum">View All Posts</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ForumCardProps {
  title: string;
  author: string;
  avatar: string;
  time: string;
  replies: number;
  color: 'blue' | 'green' | 'gray';
  tag: string;
  featured?: boolean;
}

export const ForumCard = ({ title, author, avatar, time, replies, color, tag, featured = false }: ForumCardProps) => {
  const colorClasses = {
    blue: {
      bg: 'bg-syinq-blue',
      text: 'text-syinq-blue',
      light: 'bg-syinq-blue/10',
    },
    green: {
      bg: 'bg-syinq-green',
      text: 'text-syinq-green',
      light: 'bg-syinq-green/10',
    },
    gray: {
      bg: 'bg-syinq-gray',
      text: 'text-syinq-gray',
      light: 'bg-syinq-gray/10',
    },
  };
  
  return (
    <div 
      className={cn(
        "min-w-[280px] h-full",
        "bg-white rounded-2xl shadow-sm border border-gray-100",
        "transition-all duration-300 hover:shadow-md hover:-translate-y-1",
        featured && "ring-2 ring-syinq-blue/20"
      )}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <span className={cn("text-xs px-2 py-1 rounded-full", colorClasses[color].light, colorClasses[color].text)}>
            {tag}
          </span>
          {featured && (
            <span className="bg-syinq-blue/10 text-syinq-blue text-xs px-2 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>
        
        <h3 className="font-semibold text-lg mb-4">{title}</h3>
        
        <div className="flex items-center mt-6">
          <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium", colorClasses[color].bg)}>
            {avatar}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{author}</p>
            <p className="text-xs text-syinq-gray">{time}</p>
          </div>
          <div className="ml-auto text-xs bg-syinq-lightgray py-1 px-2 rounded-full text-syinq-gray">
            {replies} replies
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
