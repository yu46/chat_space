class Group < ApplicationRecord
  has_many :users, through: :group_users
  has_many :group_users
  has_many :massages #messageはいらない？状況で判断？
  validates :users, presence: true
end
