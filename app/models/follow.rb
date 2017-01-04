class Follow < ApplicationRecord

	def self.destroy_friendship(friendship_id, user_id, current_user)
		Follow.destroy(friendship_id)
		Follower.where(is_followed_by: current_user.id, user_id: user_id).destroy_all
	end

	def self.create_friendship(user_id, current_user)
		current_user.follows.create(following: user_id)
		Follower.create(is_followed_by: current_user.id, user_id: user_id)
	end

end
