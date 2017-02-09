class AddTweetIdToHashtag < ActiveRecord::Migration[5.0]
  def change
    add_column :hashtags, :tweet_id, :int
  end
end
