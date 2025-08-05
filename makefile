# 快速rebase，为什么不使用git rebase origin/master ?
rebase:
	export branch=`git branch | grep \* | grep -Eo ' .+'` && \
		git checkout master && \
		git pull --rebase && \
		git checkout $$branch && \
		git rebase master;

reset:
	@echo "------以下为你的commit信息-------"
	@git log master.. --pretty=format:%B | grep -vE '^\s*$$' | cat
	@echo "\n\n------代码已经reset成功，请add commit有意义的提交信息-------"
	@git log master.. --pretty=format:"%P" --reverse | head -1 | xargs git reset --soft; git reset HEAD . > /tmp/webApp.gitreset.log; git status
