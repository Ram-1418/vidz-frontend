import React from 'react'
import Tweet from './Tweet'
const Tweetlist = ({tweets, handleLike, handleDelete}:any ) => {
  return (
    <div className="mt-6 space-y-5">
        {tweets.map((item) => (
          <div key={item._id} className="flex gap-3">
            {/* AVATAR */}
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>

            <div className="flex-1">
              {/* NAME + TIME */}
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">User</span>
                <span className="text-gray-500 text-xs">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* CONTENT */}
              <p className="text-sm mt-1 text-gray-800">{item.content}</p>

              {/* ACTION BAR */}
              <div className="flex items-center gap-5 mt-2 text-gray-600 text-sm">
                <button
                  onClick={() => handleLike(item._id)}
                  className="flex items-center gap-1 hover:text-black"
                >
                  👍 <span className="text-xs">{item.likes || 0}</span>
                </button>

                <button className="hover:text-black">👎</button>

                <button className="hover:text-black">Reply</button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 hover:text-red-700 text-xs ml-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
  )
}

export default Tweetlist
