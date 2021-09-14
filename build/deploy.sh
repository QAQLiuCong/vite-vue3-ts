#!/bin/bash
# 一旦出现了返回值非零，整个脚本就会立即退出
set -e
# 脚本所在目录
sh_dir=$(cd "$(dirname "$0")";pwd)
# 项目根目录
base_dir="${sh_dir}/.."
# dist目录
dist_dir="${base_dir}/dist"
# nginx目录
nginx_dir="/usr/local/nginx"
# teacher目录
teacher_dir="${nginx_dir}/html/teacher"
# sbin目录
sbin_dir="${nginx_dir}/sbin"
# 包名
tar_name="teacher.tar.gz"
echo '====================开始构建==========================='
echo '构建的版本号:'${BUILD_NUMBER}
echo '当前目录: ' ${base_dir}
# 返回到跟目录 安装包
cd ${dist_dir}
npm install
# 删除旧的dist文件
rm -rf dist
npm run build:prod
# 将dist目录打包到nginx/html/teacher目录下
cd ${dist_dir}
tar -zcvf "${teacher_dir}/${tar_name}" *
echo '====================打包完毕==========================='
# 回到Nginx目录下解压刚打的包
cd ${teacher_dir}
tar -zxvf ${tar_name}
# 删除gz包
rm -rf ${tar_name}
echo '====================代码更新完毕========================'
# 重启Nginx
cd ${sbin_dir}
./nginx -s reload
echo '====================重新启动完毕========================'
