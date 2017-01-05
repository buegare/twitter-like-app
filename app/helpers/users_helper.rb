module UsersHelper

	def check_friendship_status(user)
		if is_signed_user_followed_by_user?(user) == true and signed_user_follows_user?(user) == true
			return "You follow each other"
		elsif is_signed_user_followed_by_user?(user) == true and signed_user_follows_user?(user) == false
			return "Follows you"
		elsif is_signed_user_followed_by_user?(user) == false and signed_user_follows_user?(user) == true
			return "Following"
		else
			return ""
		end
	end

	def is_signed_user_followed_by_user?(user)
		user.follows.each do |user|
			return true if user.following == current_user.id
		end
		return false
	end

	def signed_user_follows_user?(user)
		user.followers.each do |user|
			return true if user.is_followed_by == current_user.id
		end
		return false
	end

	def get_actions(user_id)
		return "Edit Profile" if current_user.id == user_id
		current_user.follows.each do |user|
			return "Following" if user.following == user_id
		end
		return "Follow"
	end

	def find_user(user_id)
		return User.find(user_id)
	end
end
