class FriendshipsController < ApplicationController

	def create_friendship
		
		@user = User.find(params[:user_id])
		follows_friendship = current_user.follows.build(following: @user.id)
		follower_friendship = @user.followers.build(is_followed_by: current_user.id)

  		if follows_friendship.save and follower_friendship.save
			respond_to do |format|
		    	format.js
		    end
		else
			redirect_to user_path(current_user)
		end
	end

end