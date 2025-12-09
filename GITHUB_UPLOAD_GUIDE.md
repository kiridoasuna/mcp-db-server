# GitHub上传指南

## 步骤1：在GitHub上创建新仓库

1. 打开浏览器，访问 [GitHub](https://github.com) 并登录你的账户
2. 点击页面右上角的 "+" 图标，选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: 输入仓库名称（例如：mcp-demo-server）
   - **Description**: 可选，输入仓库描述
   - **Visibility**: 选择 "Public" 或 "Private"
   - 不要勾选 "Initialize this repository with a README"（因为我们已经有README文件）
   - 其他选项保持默认
4. 点击 "Create repository"

## 步骤2：更新本地Git配置

创建仓库后，你会看到仓库的URL（例如：https://github.com/你的用户名/你的仓库名.git）

在项目根目录下运行以下命令：

```bash
# 移除现有的远程仓库（如果有）
git remote remove origin

# 添加新的远程仓库（将URL替换为你刚创建的仓库URL）
git remote add origin https://github.com/你的用户名/你的仓库名.git

# 验证远程仓库配置
git remote -v
```

## 步骤3：推送代码到新仓库

```bash
# 推送本地main分支到远程仓库
git push -u origin main
```

如果推送时出现权限错误，请确保你已经正确配置了GitHub的SSH密钥或使用了HTTPS凭证。

## 步骤4：验证推送

在浏览器中刷新你刚创建的GitHub仓库页面，你应该能看到所有的代码文件都已经成功上传。

## 步骤5：重新启动服务器

代码上传完成后，你可以重新启动服务器：

```bash
npm start
```

祝你成功！
