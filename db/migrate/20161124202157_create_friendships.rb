class CreateFriendships < ActiveRecord::Migration[5.0]
  def change
    create_table :friendships do |t|
      t.integer :user_id
      t.integer :following
      t.integer :followers

      t.timestamps
    end
    add_index :friendships, :user_id
  end
end
