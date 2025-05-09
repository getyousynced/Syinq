"use client";

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { forumPosts } from '@/components/Community';
import { useToast } from '@/hooks/useToast';

// Mock replies data for demonstration purposes
const mockReplies = {
  1: [
    {
      id: 1,
      author: "Meera Iyer",
      avatar: "MI",
      content: "I found a student ID near the library cafe yesterday. Is it yours? It had the name Arjun on it.",
      time: "1 hour ago",
      color: "blue",
    },
    {
      id: 2,
      author: "Raj Kumar",
      avatar: "RK",
      content: "You should check with the campus security office. They usually keep all lost items there.",
      time: "45 minutes ago",
      color: "green",
    },
  ],
  2: [
    {
      id: 1,
      author: "Siddharth Patel",
      avatar: "SP",
      content: "Looking forward to the DJ night! Anyone know if there's a dress code?",
      time: "12 hours ago",
      color: "green",
    },
    {
      id: 2,
      author: "Neha Sharma",
      avatar: "NS",
      content: "The theme is 'Neon Nights' so wear something bright or white that will glow under the UV lights!",
      time: "10 hours ago",
      color: "gray",
    },
  ],
  3: [
    {
      id: 1,
      author: "Ananya Gupta",
      avatar: "AG",
      content: "I'm also looking for a roommate! Let's connect and see if we'd be a good match.",
      time: "2 days ago",
      color: "blue",
    },
  ],
};

// Mock post content since our Community component doesn't have content
const mockPostContent = {
  1: "Hey everyone, I lost my student ID somewhere near the library yesterday afternoon. If anyone has found it, please let me know! It has my name (Arjun Sharma) and ID number on it. I've already reported it to campus security but hoping someone here might have seen it. Thanks in advance! 🙏",
  2: "The fresher's party is officially set for next Friday at the Main Auditorium! 🎉 \n\nTimings: 6 PM to 11 PM\n\nHighlights:\n- DJ with the latest Bollywood & International hits\n- Food & refreshments\n- Talent showcase\n- Best dressed competition\n\nMake sure to bring your student ID for entry. See you all there!",
  3: "Hi everyone, I'm a third-year Computer Science student looking for a roommate urgently. My previous roommate graduated early and I need someone to share the apartment starting next month. \n\nApartment is located just 5 minutes walking distance from campus with all amenities (WiFi, AC, fully furnished). Rent is ₹12,000 per person including utilities. \n\nPrefer someone who's relatively quiet during weeknights and okay with occasional weekend gatherings. DM me if interested!",
  4: "Let's form a study group for the upcoming finals! I'm looking for fellow Computer Science students to prepare together for Data Structures, Algorithms and Database Management exams. We can meet at the library or the new campus cafe. Comment below if you're interested!",
  5: "Planning a casual coffee meetup this Saturday at 4 PM at Brew Corner near East Gate. Anyone interested in joining for some casual conversation, networking, and of course, great coffee? Everyone is welcome!",
};

export default function PostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [replyText, setReplyText] = useState('');
  
  // Find the post from our mock data
  const postId = Number(params.id);
  const post = forumPosts.find(p => p.id === postId);
  
  // If post doesn't exist, show 404
  if (!post) {
    notFound();
  }
  
  // Get mock replies for this post, or empty array if none
  const postReplies = (mockReplies as any)[postId] || [];
  
  // Handle reply submission
  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) {
      toast({
        title: "Empty reply",
        description: "Please write something before posting",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Reply posted",
      description: "Your reply has been added to the discussion",
    });
    
    setReplyText('');
  };

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Button 
        variant="ghost" 
        className="mb-6 text-syinq-gray hover:text-syinq-blue flex items-center gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft size={16} />
        Back to Forum
      </Button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex justify-between items-start mb-6">
          <span className={`text-xs px-3 py-1 rounded-full ${colorClasses[post.color as 'blue' | 'green' | 'gray'].light} ${colorClasses[post.color as 'blue' | 'green' | 'gray'].text}`}>
            {post.tag}
          </span>
          {post.featured && (
            <span className="bg-syinq-blue/10 text-syinq-blue text-xs px-3 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>
        
        <h1 className="text-2xl font-bold mb-6">{post.title}</h1>
        
        <div className="flex items-center mb-6">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${colorClasses[post.color as 'blue' | 'green' | 'gray'].bg}`}>
            {post.avatar}
          </div>
          <div className="ml-3">
            <p className="font-medium">{post.author}</p>
            <p className="text-sm text-syinq-gray">{post.time}</p>
          </div>
        </div>
        
        <div className="prose max-w-none mb-6">
          <p className="whitespace-pre-line">{(mockPostContent as any)[postId]}</p>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-6">Replies ({postReplies.length})</h2>
        
        {postReplies.length > 0 ? (
          <div className="space-y-6">
            {postReplies.map((reply: any) => (
              <div key={reply.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-white ${colorClasses[reply.color as 'blue' | 'green' | 'gray'].bg}`}>
                    {reply.avatar}
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-2 items-center mb-2">
                      <p className="font-medium">{reply.author}</p>
                      <p className="text-sm text-syinq-gray">{reply.time}</p>
                    </div>
                    <p>{reply.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-2xl">
            <p className="text-syinq-gray">No replies yet. Be the first to respond!</p>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold mb-6">Add a Reply</h2>
        
        <form onSubmit={handleSubmitReply}>
          <div className="mb-4">
            <textarea
              className="w-full border border-gray-200 rounded-xl p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-syinq-blue/20"
              placeholder="Write your reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Post Reply</Button>
        </form>
      </div>
    </div>
  );
}