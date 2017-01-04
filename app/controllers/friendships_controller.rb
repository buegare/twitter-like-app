class FriendshipsController < ApplicationController

	def handle_friendship
		@user = User.find(params[:user_id])

		if params[:user_id] == current_user.id
			return
		else
			signed_user_follows_user = current_user.follows.where(following: params[:user_id]).first
			if signed_user_follows_user
				Follow.destroy_friendship(signed_user_follows_user.id, params[:user_id], current_user)
			else
				Follow.create_friendship(params[:user_id], current_user)
			end
		end
	end

end