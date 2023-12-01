[中文版](#Chinese) / [English](#English)

# Cloudflare Email Worker as a Service / API

Cloudflare Email Routing 免费邮件发送（作为 Service 服务）用于 Workers/Pages 项目中。

## 赞助 Sponsor

如果您对本项目感兴趣，可以通过以下方式支持我：

- 关注我的 Github 账号：[@willin](https://github.com/willin) [![github](https://img.shields.io/github/followers/willin.svg?style=social&label=Followers)](https://github.com/willin)
- 参与 [爱发电](https://afdian.net/@willin) 计划
- 支付宝或微信[扫码打赏](https://user-images.githubusercontent.com/1890238/89126156-0f3eeb80-d516-11ea-9046-5a3a5d59b86b.png)

Donation ways:

- Github: <https://github.com/sponsors/willin>
- Paypal: <https://paypal.me/willinwang>
- Alipay or Wechat Pay: [QRCode](https://user-images.githubusercontent.com/1890238/89126156-0f3eeb80-d516-11ea-9046-5a3a5d59b86b.png)

## 许可证 License

Apache-2.0

<a id="Chinese"></a>

## 准备工作

1. 准备一个域名，例如 `example.com`。现在，在 [cloudflare-dashboard](https://dash.cloudflare.com/) 中添加一个网站并构建您的域名。这可能需要大约 30 分钟。
2. 选择您的站点和域名，[启用电子邮件路由](https://developers.cloudflare.com/email-routing/get-started/enable-email-routing/)。这可能需要大约 5 分钟。
3. 安装 wrangler 以部署 cf worker。确保您的 node 版本 >= 16.13.0 并运行：

```sh
npm install wrangler@latest -g
```

## 设置

1. 获取代码

```sh
git clone git@github.com:willin/cloudflare-send-email-service.git
```

2. 部署您的 worker

```sh
# 建议改个名字
wrangler deploy  --name send-email-worker-service
```

3. 配置域名解析

创建第一个 TXT 解析记录：

- Name: `yourdomain.com`
- Value: `v=spf1 a mx include:relay.mailchannels.net ~all`

创建第二个 TXT 解析记录：

- Name: `_mailchannels.yourdomain.com`
- Value: `v=mc1 cfid=yourdomain.workers.dev` (`cfid` 会在你测试的报错信息中看到，解析后等待生效大约需要半天)

> 更多关于 [Domain Lockdown](https://support.mailchannels.com/hc/en-us/articles/16918954360845-Secure-your-domain-name-against-spoofing-with-Domain-Lockdown) 错误的信息

4. 设置 DKIM

这一步是可选的，但强烈推荐您去做。您可以参考 [MailChannels 文档](https://support.mailchannels.com/hc/en-us/articles/7122849237389-Adding-a-DKIM-Signature) 步骤来完成域名的 DKIM 设置。

## API 文档

### 地址

`http://{{your-cf-worker-prefix}}.workers.dev/`

### 方法

`POST`

### 参数

| 名称              | 类型     | 描述                   |
| ----------------- | -------- | ---------------------- |
| `sender_email`    | `string` | 发件人的电子邮件地址。 |
| `sender_name`     | `string` | 发件人的名称。         |
| `recipient_email` | `string` | 收件人的电子邮件地址。 |
| `subject`         | `string` | 电子邮件的主题。       |
| `message`         | `string` | 电子邮件的正文。       |

### 示例请求

```sh
curl -d"sender_email=admin@yourdomain.com&sender_name=Test&recipient_email=your-dest@example.com&subject='Hello Guy!'&message='My first email sent!'" "http://your-cf-worker-prefix.workers.dev/"
```

注意，端点 URL 中的 `your-cf-worker-prefix` 需要替换为实际的 worker 前缀。

<a id="English"></a>

# Cloudflare Email Worker as a Service / API

A private api/worker service for sending email powered by Cloudflare worker project.

## Prepare Job

1. Prepare a domian, such as `example.com`. Now, add a website in [cloudflare-dashboard](https://dash.cloudflare.com/) and build your domain. It maybe cost you about 30min.
2. Select your site and domain, [Enable Email Routing](https://developers.cloudflare.com/email-routing/get-started/enable-email-routing/). It maybe cost you about 5min.
3. Install warngler for delpoy cf worker. Ensure your node version >= 16.13.0 and run :

```sh
npm install wrangler@latest -g
```

## Setup

1. Get the code

```sh
git clone git@github.com:willin/cloudflare-send-email-service.git
```

2. Deploy your worker

```sh
wrangler deploy  --name send-email-worker-service
```

3. Config DNS records

Add a TXT record to your domain with the following values:

- Name: `yourdomain.com`
- Value: `v=spf1 a mx include:relay.mailchannels.net ~all`

Note: If you're facing [Domain Lockdown](https://support.mailchannels.com/hc/en-us/articles/16918954360845-Secure-your-domain-name-against-spoofing-with-Domain-Lockdown) error, follow the below steps:

- Name: `_mailchannels.yourdomain.com`
- Value: `v=mc1 cfid=yourdomain.workers.dev` (the value of `cfid` will also be present in the error response)

4. Setup DKIM

This step is optional, but highly recommended. DKIM is a DNS record that helps prevent email spoofing. You may follow the steps listed in the [MailChannels documentation](https://support.mailchannels.com/hc/en-us/articles/7122849237389-Adding-a-DKIM-Signature) to set up DKIM for your domain.

## API Documentation

### Endpoint

`http://{{your-cf-worker-prefix}}.workers.dev/`

### Method

`POST`

### Parameters

| Name              | Type     | Description                         |
| ----------------- | -------- | ----------------------------------- |
| `sender_email`    | `string` | The email address of the sender.    |
| `sender_name`     | `string` | The name of the sender.             |
| `recipient_email` | `string` | The email address of the recipient. |
| `subject`         | `string` | The subject of the email.           |
| `message`         | `string` | The message body of the email.      |

### Example Request

```sh
curl -d"sender_email=admin@yourdomain.com&sender_name=Demo&recipient_email=your-dest@example.com&subject='Hello Guy!'&msg_data='My first email sent!'" "http://your-cf-worker-prefix.workers.dev/"
```
