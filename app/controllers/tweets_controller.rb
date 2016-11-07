class TweetsController < ApplicationController

	def index
		@tweets = Tweet.all
	end

	def new
  		@tweet = current_user.tweets.build
  	end

  	def create
  		@tweet = current_user.tweets.build(tweet_params)

  		if @tweet.save
  			flash[:success] = "New poll created successfuly!"
			redirect_to tweet_path(@tweet)
		else
			render 'new'
		end
  	end

  	private

  		def tweet_params
	      params.require(:tweet).permit(:title, :body)
	    end


end