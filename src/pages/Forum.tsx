
import React, { useState } from 'react';
import { forumPosts, ForumCard } from '@/components/Community';
import { Users, Search } from 'lucide-react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

// Additional forum posts
const allForumPosts = [
  ...forumPosts,
  {
    id: 9,
    title: "Volunteer Opportunity: Campus Cleanup",
    author: "Tyler Zhang",
    avatar: "TZ",
    time: "4 days ago",
    replies: 28,
    color: "green",
    tag: "Volunteer",
    featured: false
  },
  {
    id: 10,
    title: "Guitar Lessons for Beginners",
    author: "Riley Clark",
    avatar: "RC",
    time: "1 week ago",
    replies: 14,
    color: "blue",
    tag: "Skills",
    featured: false
  },
  {
    id: 11,
    title: "Campus Wi-Fi Issues in Dorm B",
    author: "Jordan Taylor",
    avatar: "JT",
    time: "3 days ago",
    replies: 22,
    color: "blue",
    tag: "Help",
    featured: false
  },
  {
    id: 12,
    title: "Looking for Carpool to Downtown",
    author: "Morgan Lewis",
    avatar: "ML",
    time: "12 hours ago",
    replies: 5,
    color: "gray",
    tag: "Transport",
    featured: false
  },
  {
    id: 13,
    title: "Campus Food Festival This Weekend!",
    author: "Sam Rivera",
    avatar: "SR",
    time: "2 days ago",
    replies: 41,
    color: "green",
    tag: "Event",
    featured: true
  },
  {
    id: 14,
    title: "Sublet Available for Summer",
    author: "Casey Wong",
    avatar: "CW",
    time: "5 days ago",
    replies: 17,
    color: "gray",
    tag: "Housing",
    featured: false
  },
  {
    id: 15,
    title: "Free Tutoring for Calculus",
    author: "Avery Kim",
    avatar: "AK", 
    time: "3 days ago",
    replies: 26,
    color: "blue",
    tag: "Academic",
    featured: false
  },
  {
    id: 16,
    title: "Mental Health Support Group",
    author: "Jamie Patel",
    avatar: "JP",
    time: "1 week ago",
    replies: 33,
    color: "green",
    tag: "Wellness",
    featured: true
  }
];

// Get unique tags
const tags = Array.from(new Set(allForumPosts.map(post => post.tag)));

const Forum = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const postsPerPage = 9;
  
  // Filter posts by tag if selected
  const filteredPosts = selectedTag 
    ? allForumPosts.filter(post => post.tag === selectedTag)
    : allForumPosts;
    
  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const handleTagFilter = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
      setCurrentPage(1);
    }
  };
  
  return (
    <div className="min-h-screen bg-syinq-lightgray/30 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button variant="outline" asChild className="mr-4">
            <Link to="/">← Back to Home</Link>
          </Button>
          <h1 className="text-3xl font-bold flex items-center">
            <Users className="h-6 w-6 text-syinq-blue mr-2" />
            Campus Community Forum
          </h1>
        </div>
        
        {/* Tags Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Filter by Topic:</h2>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-2 pb-2">
              {tags.map((tag) => (
                <Badge 
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  className="cursor-pointer px-3 py-1 text-sm"
                  onClick={() => handleTagFilter(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Search bar placeholder */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search forum posts..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-syinq-blue focus:border-syinq-blue"
          />
        </div>
        
        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts.map((post) => (
            <ForumCard
              key={post.id}
              title={post.title}
              author={post.author}
              avatar={post.avatar}
              time={post.time}
              replies={post.replies}
              color={post.color as 'blue' | 'green' | 'gray'}
              tag={post.tag}
              featured={post.featured}
            />
          ))}
        </div>
        
        {/* Empty state */}
        {currentPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No posts match your filter.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setSelectedTag(null)}
            >
              Clear Filter
            </Button>
          </div>
        )}
        
        {/* Pagination */}
        {filteredPosts.length > postsPerPage && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className="cursor-pointer"
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default Forum;
