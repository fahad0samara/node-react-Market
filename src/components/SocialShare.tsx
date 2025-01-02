import React from 'react';
import { Share2, Facebook, Twitter, LinkedIn, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface Props {
  url: string;
  title: string;
  description?: string;
}

export default function SocialShare({ url, title, description }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  const shareData = {
    title,
    text: description,
    url,
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      setIsOpen(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
      >
        <Share2 className="w-5 h-5" />
        <span>Share</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-2 z-50"
          >
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <Facebook className="w-5 h-5 text-blue-600" />
                <span>Facebook</span>
              </a>
              
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <Twitter className="w-5 h-5 text-blue-400" />
                <span>Twitter</span>
              </a>
              
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <LinkedIn className="w-5 h-5 text-blue-700" />
                <span>LinkedIn</span>
              </a>
              
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <LinkIcon className="w-5 h-5 text-gray-600" />
                <span>Copy Link</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}