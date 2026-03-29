"use client";

import React, { useState } from 'react';
import { Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { forumPosts } from '@/components/Community';
import { ForumCard } from '@/components/Community';
import { useToast } from '@/hooks/useToast';

export default function ForumPage() {
  const { toast } = useToast();
  const [filter, setFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const isForumLive = false;

  // Available tags from our data
  const tags = Array.from(new Set(forumPosts.map(post => post.tag)));

  // Filter posts based on selected tag and search query
  const filteredPosts = forumPosts.filter(post => {
    const matchesTag = filter ? post.tag === filter : true;
    const matchesSearch = searchQuery
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesTag && matchesSearch;
  });

  // Sort posts with featured posts first, then by most recent
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  const handleCreatePost = () => {
    toast({
      title: "Coming Soon",
      description: "Post creation will be available in the next update",
    });
  };

  return (
    <div className="bg-gradient-to-b from-blue-50/50 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block bg-syinq-blue/10 p-3 rounded-2xl mb-4">
            <Users className="h-6 w-6 text-syinq-blue" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Community Forum –
            <span className="text-syinq-blue"> Where Campus Talks</span>
          </h1>
          <p className="text-lg text-syinq-gray">
            Connect with peers, share information, and stay updated on campus events.
          </p>
          {!isForumLive && (
            <div className="mt-4 inline-flex items-center rounded-full bg-syinq-blue/10 px-3 py-1 text-sm font-medium text-syinq-blue">
              Coming soon
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="w-full md:w-auto flex flex-wrap gap-2" role="group" aria-label="Filter posts by tag">
            <Button
              variant={!filter ? "default" : "outline"}
              onClick={() => setFilter(null)}
              className="text-sm h-9"
              disabled={!isForumLive}
              aria-pressed={!filter}
            >
              All Posts
            </Button>
            {tags.map((tag) => (
              <Button
                key={tag}
                variant={filter === tag ? "default" : "outline"}
                onClick={() => setFilter(tag)}
                className="text-sm h-9"
                disabled={!isForumLive}
                aria-pressed={filter === tag}
              >
                {tag}
              </Button>
            ))}
          </div>

          <div className="w-full md:w-auto flex gap-2">
            <div className="relative">
              <label htmlFor="forum-search" className="sr-only">Search posts</label>
              <input
                id="forum-search"
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-syinq-blue/20"
                disabled={!isForumLive}
              />
            </div>
            <Button onClick={handleCreatePost} disabled={!isForumLive}>
              Create Post
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPosts.length > 0 ? (
            sortedPosts.map((post) => (
              <Link key={post.id} href={`/forum/${post.id}`}>
                <div className="h-full">
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
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-16 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-syinq-blue/10 flex items-center justify-center">
                <Users className="h-8 w-8 text-syinq-blue" />
              </div>
              <p className="text-xl font-semibold text-syinq-dark">No posts found</p>
              <p className="text-syinq-gray text-sm">Try adjusting your filters or search query.</p>
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => {
                  setFilter(null);
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
