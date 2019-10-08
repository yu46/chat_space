class MessagesController < ApplicationController
  def index
  end
  def create
    @group = current_user.new
    @message = current_user.new
  end
end
