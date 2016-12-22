class User < ApplicationRecord
  extend FriendlyId
  friendly_id :username, use: :slugged

  has_attached_file :image, styles: { large: "600x600>", medium: "300x300>", thumb: "50x50#" },
  							url: "/assets/users/:id/:style/:basename.:extension",
  							path: ":rails_root/public/assets/users/:id/:style/:basename.:extension"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  has_many :tweets
  has_many :follows
  has_many :followers

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
