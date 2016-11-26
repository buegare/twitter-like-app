class TweetsController < ApplicationController
	before_action :set_tweet, only: [:show, :edit, :destroy, :update ]

	def index
		@follows = current_user.follows.map(&:following)
		@tweets = Tweet.where(user_id: @follows)
		@mytweets = current_user.tweets
		@followers = current_user.followers
		@tweet = current_user.tweets.build
	end

	def new
  		@tweet = current_user.tweets.build
  	end

  	def show; end

  	def create
  		@tweet = current_user.tweets.build(tweet_params)

  		if @tweet.save
  			flash[:success] = "New Tweet created successfuly!"
			redirect_to tweet_path(@tweet)
		else
			render 'new'
		end
  	end

  	private

  		def set_tweet
	      @tweet = Tweet.find(params[:id])
	    end

  		def tweet_params
	      params.require(:tweet).permit(:title, :body)
	    end


end