### Cosmawasm contracts

To update the schema run:


```
npm install -g @cosmwasm/ts-codegen@1.10.0

ts-codegen generate \         
    --plugin client \
    --schema ./schema \
    --out ./ts \
    --name SocialRecovery \
    --no-bundle
```
