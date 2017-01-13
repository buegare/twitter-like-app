class TweetsController < ApplicationController
	before_action :set_tweet, only: [:show, :edit, :destroy, :update ]
	before_action :new_tweet, only: [:index, :new ]

	def index
		@tweets = Tweet.where(user_id: current_user.follows.map(&:following)).order(created_at: :desc)
	end

  	def create
  		@tweet = current_user.tweets.build(tweet_params)

  		if @tweet.save
  			flash[:success] = "New Tweet created successfuly!"
			redirect_to user_path(current_user)
		else
			render 'new'
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
	      params.require(:tweet).permit(:title, :body)
	    end


end