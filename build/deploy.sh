#!/bin/bash
# 一旦出现了返回值非零，整个脚本就会立即退出
set -e
# 脚本所在目录
sh_dir=$(cd "$(dirname "$0")";pwd)
# 项目根目录
base_dir="${sh_dir}"
# dist目录
dist_dir="${base_dir}/dist"
# nginx目录
nginx_dir="/usr/local/nginx"
# project
project_dir="${nginx_dir}/html/project"
# sbin目录
sbin_dir="${nginx_dir}/sbin"
# 包名
tar_name="project.tar.gz"
echo '====================开始构建==========================='
echo '构建的版本号：'${BUILD_NUMBER}
echo '当前目录: ' ${base_dir}
# 返回到跟目录 安装包
# cd ${dist_dir}
echo '+npm install'
npm install
# 删除旧的dist文件
# rm -rf dist
echo '+npm run build'
npm run build
# 将dist目录打包到nginx/html/project目录下
cd ${dist_dir}
tar -zcvf "${project_dir}/${tar_name}" *
echo '====================打包完毕==========================='
# 回到Nginx目录下解压刚打的包
cd ${project_dir}
tar -zxvf ${tar_name}
# 删除gz包
rm -rf ${tar_name}
echo '====================代码更新完毕========================'
# 重启Nginx
cd ${sbin_dir}
./nginx -s reload
echo '====================重新启动完毕========================'
