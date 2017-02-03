class UsersController < ApplicationController
	before_action :set_user, only: [:edit, :update ]
	before_action :show_actions, only: [:show, :show_following, :show_followers]

    def update
	    if @user.update(user_params)
	      redirect_back(fallback_location: authenticated_root_path())
	      flash[:msg] = "Image updated successfuly !"
	    else
	      render 'edit'
	    end
	end

	def edit; end

	def search_users
		@users_found = User.where("username like ?", "%#{params[:content_from_search_box]}%").take(8)
	
		respond_to do |format|
	    	format.js
	    end
	end

	private

	def set_user
      @user = User.find(current_user.id)
    end

	def user_params
      params.require(:user).permit(:image, :bigger_image)
    end

    def show_actions
    	@user = User.friendly.find(params[:id])
    end

end