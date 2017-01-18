class AddAttachmentBiggerImageToUsers < ActiveRecord::Migration
  def self.up
    change_table :users do |t|
      t.attachment :bigger_image
    end
  end

  def self.down
    remove_attachment :users, :bigger_image
  end
end
