require 'net/ssh'

task :deploy do
  host = ENV["SERVER_IP"]
  user = "chris"
  options = {:keys => "~/.ssh/id_rsa.pub"}
  remote_path = "~/repos/summing"

  commands = [
    "cd #{remote_path} && git pull",
    "cd #{remote_path} && ~/.rbenv/bin/rbenv exec jekyll build"
  ]

  Net::SSH.start(host, user, options) do |ssh|
    commands.each { |c| puts ssh.exec!(c) }
    ssh.loop
  end

end
