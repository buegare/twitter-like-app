class HashtagsController < ApplicationController

	def show
		hashtags = Hashtag.select('tweet_id').where('word': params[:word])
		@tweets = Tweet.where('id': hashtags)
		@trends = Hashtag.group('word').order('count_word desc').count('word').first(10)
	end

end