class TweetsController < ApplicationController
	before_action :set_tweet, only: [:show, :edit, :destroy, :update ]

	def index
		@tweets = Tweet.where(user_id: current_user.follows.map(&:following))
		@tweet = current_user.tweets.build
		@user = current_user
	end

	def new
  		@tweet = current_user.tweets.build
  	end

  	def show; end

  	def create
  		@tweet = current_user.tweets.build(tweet_params)

  		if @tweet.save
  			flash[:success] = "New Tweet created successfuly!"
			redirect_to user_path(current_user.id)
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