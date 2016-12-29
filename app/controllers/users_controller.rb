class UsersController < ApplicationController
	before_action :set_user, only: [:edit, :update ]

	def show
      @user = User.friendly.find(params[:id])
	  @tweets = Tweet.where(user_id: current_user.id).order(created_at: :desc)
    end

    def update
	    if @user.update(user_params)
	      redirect_to authenticated_root_path()
	    else
	      render 'edit'
	    end
	end

	def edit; end

	def search_users
		@users_found = User.where("username like ?", "%#{params[:content_from_search_box]}%")
	
		respond_to do |format|
	    	format.js
	    end
	end

	private

	def set_user
      @user = User.find(current_user.id)
    end

	def user_params
      params.require(:user).permit(:image)
    end

end