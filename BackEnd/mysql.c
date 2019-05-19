use Buy_Helper;
create table user(
    openid varchar(30),
    nickname varchar(20),
    avatarUrl text,
    gender  varchar(1),
    school  varchar(30),
    wechat  varchar(50),
    status  int,	//状态
    stars   int,  //星星
    registe_time	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (openid)
);


create table daigou(
	did int AUTO_INCREMENT,
	uid varchar(32) NOT NULL,
	destination varchar(100),
	description text,
	imageUrl text,
	status1_image text,  
	status2_image text,
	status int,
	last_for_time varchar(100),//结束时间
	issue_time	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	primary key(did),
	foreign key(uid) references user(openid)
)
create table sub_daigou(
	sdid int AUTO_INCREMENT,
	uid varchar(32),
	did int,
	description text,
	payment varchar(50),
	status int,
	primary key(sdid),
	foreign key(uid) references user(openid),
	foreign key(did) references daigou(did)
	)

create table qiugou(
	qid int AUTO_INCREMENT,
	uid varchar(32),
	uid2 varchar(32),//接单后，在详情页面会看到接单者的联系方式
	destination varchar(100),
	description text,
	imageUrl text,
	status1_image text,
	status2_image text,
	last_for_time varchar(100)
	issue_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	primary key(qid),
	foreign key(uid) references user(openid),
	foreign key(uid2) references user(openid)
	)

create table sub_qiugou(
	sdid int AUTO_INCREMENT,
	uid varchar(32),
	did int,
	description text,
	payment varchar(50),
	status int,
	primary key(sdid),
	foreign key(uid) references user(openid),
	foreign key(did) references daigou(did)
	)
