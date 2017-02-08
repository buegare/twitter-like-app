class TweetsController < ApplicationController
	before_action :set_tweet, only: [:show, :edit, :destroy, :update ]
	before_action :new_tweet, only: [:index, :new ]

	def index
		@tweets = Tweet.where(user_id: current_user.follows.map(&:following)).order(created_at: :desc)
		@trends = Hashtag.group('word').order('count_word desc').count('word').first(10)
	end

  	def create
  		@tweet = current_user.tweets.build(tweet_params)

  		if @tweet.save
  			flash[:msg] = "New Tweet created successfuly!"
			redirect_to user_path(current_user)
		else
			flash[:msg] = "An error has occurred! Your Tweet couldn't be created."
			redirect_to authenticated_root_path()
		end
  	end

  	private

  		def set_tweet
	      @tweet = Tweet.find(params[:id])
	    end

	    def new_tweet
	    	@tweet = current_user.tweets.build
	    end

  		def tweet_params
	      params.require(:tweet).permit(:body, :photo)
	    end


end