# WorldCup2022 Qatar

该服务用于保存账号的推荐码, 以及通过推荐码下单的记录.

# 配置
1. 重命名根目录的下`.env.example` 为 `.env`  
2. 配置`.env`文件中的关于MYSQL数据库的信息.

# 启动服务
服务使用pm2管理.  

`pm2 start pm2.config.js`  

# 接口
* POST `/refcode`  
用于保存用户的推荐码.

* GET  `/refcode`  
用于查询用户的推荐码

* POST `/refbet`  
用于保存用户通过推荐码下单的纪录.