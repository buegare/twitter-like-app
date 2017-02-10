class User < ApplicationRecord
  before_save :insert_at_character 

  extend FriendlyId
  friendly_id :username, use: :slugged

  has_attached_file :image, styles: { large: "1600x900>", medium: "300x300>", thumb: "50x50#" },
                default_url: "image.png",
                url: "/assets/users/:id/image/:style/:basename.:extension",
                path: ":rails_root/public/assets/users/:id/image/:style/:basename.:extension"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  has_attached_file :bigger_image, styles: { large: "1600x900>"},
                url: "/assets/users/:id/bigger_image/:style/:basename.:extension",
                path: ":rails_root/public/assets/users/:id/bigger_image/:style/:basename.:extension"
  validates_attachment_content_type :bigger_image, content_type: /\Aimage\/.*\z/

  has_many :tweets, dependent: :destroy
  has_many :follows
  has_many :followers

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  private

    def insert_at_character
      if self.username[0] != '@'
        self.username = '@' + self.username
      end
    end
end
