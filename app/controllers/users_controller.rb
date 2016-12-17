class UsersController < ApplicationController
	before_action :set_user, only: [:edit, :update ]

	def show
      @user = User.friendly.find(params[:id])
      # redirect_to action: 'index', status: 301 unless @poll.friendly_id == params[:id]
    end

    def update
	    if @user.update(user_params)
	      redirect_to authenticated_root_path()
	    else
	      render 'edit'
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